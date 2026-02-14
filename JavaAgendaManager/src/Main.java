public class Main {
    public static void main(String[] args){
        Fecha hoy=new Fecha(14,2);
        Agenda miAgenda = new Agenda(hoy);

        //Creamos unos recordatorios para hoy
        Recordatorio r1 = new Recordatorio("Estudiar para el parcial",hoy, new Horario(8,30));
        Recordatorio r2 = new Recordatorio("Reunión",hoy, new Horario(11,30));

        //Creamos un recordatorio para mañana
        Fecha mañana = new Fecha(15, 2);
        Recordatorio r3 = new Recordatorio("Llevar a vacunar al gato", mañana, new Horario(9, 0));

        miAgenda.agregarRecordatorio(r1);
        miAgenda.agregarRecordatorio(r2);
        miAgenda.agregarRecordatorio(r3);

        System.out.println("--- Agenda de Hoy ---");
        System.out.println(miAgenda.toString());

        System.out.println("--- Agenda para mañana ---");
        miAgenda.incrementarDia();
        System.out.println(miAgenda.toString());

    }
}
