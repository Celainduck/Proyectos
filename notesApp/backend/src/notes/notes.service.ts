import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private async processCategories(categoryNames: string[]): Promise<Category[]> {
    if (!categoryNames || categoryNames.length === 0) return [];
    
    const categories: Category[] = [];
    for (const name of categoryNames) {
      const trimmedName = name.trim();
      if (!trimmedName) continue;
      
      let category = await this.categoryRepository.findOneBy({ name: trimmedName });
      if (!category) {
        category = this.categoryRepository.create({ name: trimmedName });
        await this.categoryRepository.save(category);
      }
      categories.push(category);
    }
    return categories;
  }

  async create(createNoteDto: CreateNoteDto) {
    const { categories, ...noteData } = createNoteDto;
    const note = this.notesRepository.create(noteData);
    
    if (categories) {
      note.categories = await this.processCategories(categories);
    }
    
    return this.notesRepository.save(note);
  }

  findAll(isArchived?: boolean, categoryName?: string) {
    const queryBuilder = this.notesRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.categories', 'category');

    if (isArchived !== undefined) {
      queryBuilder.andWhere('note.isArchived = :isArchived', { isArchived });
    }

    if (categoryName) {
      queryBuilder.andWhere('category.name = :categoryName', { categoryName });
    }

    queryBuilder.orderBy('note.createdAt', 'DESC');
    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.notesRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const { categories, ...noteData } = updateNoteDto;
    
    const note = await this.findOne(id);
    if (!note) return null;

    if (categories !== undefined) {
      note.categories = await this.processCategories(categories);
    }
    
    Object.assign(note, noteData);
    return this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    if (note) {
      await this.notesRepository.remove(note);
    }
    return note;
  }
}
