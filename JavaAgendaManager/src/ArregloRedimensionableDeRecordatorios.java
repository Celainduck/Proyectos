public class ArregloRedimensionableDeRecordatorios {
    private Recordatorio[] recordatorios;
    private int longitud;

    public ArregloRedimensionableDeRecordatorios() {
        this.recordatorios = new Recordatorio[10];
        this.longitud=0;
    }

    public int longitud() {
        return this.longitud;
    }

    public void agregarAtras(Recordatorio i) {
        if(this.longitud== this.recordatorios.length){
            Recordatorio[] nuevoArreglo =new Recordatorio[this.recordatorios.length * 2];
            for(int j =0;j<this.longitud;j++){
                nuevoArreglo[j]=this.recordatorios[j];
            }
            this.recordatorios = nuevoArreglo;
        }
        this.recordatorios[this.longitud]=i;
        this.longitud++;
    }

    public Recordatorio obtener(int i) {
        return this.recordatorios[i];
    }

    public void quitarAtras() {
        if (this.longitud > 0) {
        this.longitud--;
    }
    }

    public void modificarPosicion(int indice, Recordatorio valor) {
        this.recordatorios[indice]=valor;
    }

    public ArregloRedimensionableDeRecordatorios(ArregloRedimensionableDeRecordatorios vector) {
        this.longitud =vector.longitud();
        this.recordatorios = new Recordatorio[vector.recordatorios.length];
        for(int i=0;i<this.longitud();i++){
            this.recordatorios[i]=new Recordatorio(vector.obtener(i));
        }
        
    }
    public ArregloRedimensionableDeRecordatorios copiar() {
        return new ArregloRedimensionableDeRecordatorios(this);
    }
    
}
