public class Horario {
    private int minutos;
    private int hora;

    public Horario(int hora, int minutos) {
        this.hora=hora;
        this.minutos=minutos;
    }
    public Horario(Horario horario) {
       this.hora=horario.hora();
        this.minutos=horario.minutos();
    }

    public int hora() {
        
        return this.hora;
    }

    public int minutos() {
       
        return this.minutos;
    }

    @Override
    public String toString() {
        return this.hora + ":" + this.minutos ;
    }

    @Override
    public boolean equals(Object otro) {
        boolean otroNoEsNull=(otro!=null);
        boolean esObjetoDeLaMismaClase=(otroNoEsNull&&otro.getClass()==this.getClass());
        if(esObjetoDeLaMismaClase){
            Horario otraHora=(Horario)otro;
            return this.hora()==otraHora.hora() && this.minutos()==otraHora.minutos();
        }
        return false;
    }

}
