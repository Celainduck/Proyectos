public class Agenda {
    private Fecha fechaActual;
    private ArregloRedimensionableDeRecordatorios recordatorios;

    public Agenda(Fecha fechaActual) {
        this.fechaActual=new Fecha(fechaActual);
        this.recordatorios = new ArregloRedimensionableDeRecordatorios();
    }

    public void agregarRecordatorio(Recordatorio recordatorio) {
       this.recordatorios.agregarAtras(recordatorio);
    }

    @Override
    public String toString() {
        String agenda = this.fechaActual().toString() + "\n" + "====="+ "\n";
        
        for(int i=0;i<this.recordatorios.longitud(); i++){
            Recordatorio recFechaActual=this.recordatorios.obtener(i);
            if(this.fechaActual().equals(recFechaActual.fecha())){
                agenda+=recFechaActual.toString()+"\n";
            }
        }
        return agenda;
    }
    public void incrementarDia() {
        this.fechaActual.incrementarDia();
    }

    public Fecha fechaActual() {
        return new Fecha(this.fechaActual);
    }

}
