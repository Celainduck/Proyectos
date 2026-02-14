public class Recordatorio {
    private String mensaje;
    private Fecha fecha;
    private Horario horario;
        
    public Recordatorio(String mensaje, Fecha fecha, Horario horario) {
        this.mensaje=mensaje;
        this.fecha=new Fecha(fecha);
        this.horario=new Horario(horario);
    }
    public Recordatorio(Recordatorio recordatorio) {
        this.mensaje = recordatorio.mensaje();
        this.fecha = new Fecha(recordatorio.fecha());
        this.horario = new Horario(recordatorio.horario());
    }
    public Horario horario() {
        return new Horario(this.horario);
    }

    public Fecha fecha() {
       return new Fecha(this.fecha);
    }

    public String mensaje() {
        return this.mensaje;
    }

    @Override
    public String toString() {
        return this.mensaje +" @ " +this.fecha()+" "+ this.horario();
    }

    @Override
    public boolean equals(Object otro) {
        boolean otroNoEsNull =(otro!= null);
        boolean esObjetoDeLaMismaClase =otroNoEsNull && otro.getClass()==this.getClass();
        if(esObjetoDeLaMismaClase){
            Recordatorio otroRecordatorio=(Recordatorio)otro;
            return this.mensaje().equals(otroRecordatorio.mensaje())&& this.fecha().equals(otroRecordatorio.fecha())&&this.horario().equals(otroRecordatorio.horario());
        }
        return false;
    }

}
