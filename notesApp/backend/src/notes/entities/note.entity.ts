import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Category, { cascade: true, eager: true })
  @JoinTable()
  categories: Category[];
}