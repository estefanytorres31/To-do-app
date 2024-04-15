export interface Task {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha_creacion?:String;
  fecha_limite: string;
  estado?:boolean
}