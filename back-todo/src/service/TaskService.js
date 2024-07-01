import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../utils/time.js";

const prisma=new PrismaClient();

export const CreateTask=async(titulo, descripcion,fecha_limite)=>{

    let todayISO = new Date().toISOString()
    let fecha_creacion = getUTCTime(todayISO)
    const newTask=await prisma.task.create({
        data:{
            titulo:titulo,
            descripcion:descripcion,
            fecha_creacion:fecha_creacion,
            fecha_limite:fecha_limite,
            estado:true
            
        }
    })
    return newTask;
}
export const editTask=async(id,titulo,descripcion,fecha_limite)=>{
    const [fecha, hora] = fecha_limite.split(' ');
    const [dia, mes, año] = fecha.split('-').map(Number);
    const [horaStr, minutosStr] = hora.split(':').map(Number);

    const fechaLimite = new Date(año, mes - 1, dia, horaStr, minutosStr);

    const fechaLimiteISO = fechaLimite.toISOString();

    let todayISO = new Date().toISOString();
    let fecha_creacion = getUTCTime(todayISO);

        const Task = await prisma.task.update({
            where: {
                id: Number(id)
            },
            data: {
                titulo: titulo,
                descripcion: descripcion,
                fecha_creacion: fecha_creacion,
                fecha_limite: fechaLimiteISO,
                estado: true
            }
        });

        const updatedTask = {
            titulo: Task.titulo,
            descripcion: Task.descripcion,
            fecha_creacion: Task.fecha_creacion,
            fecha_limite: Task.fecha_limite,
            estado: Task.estado
        };

        return updatedTask;
}
export const ListTask = async () => {
    const Tasks = await prisma.task.findMany({
        where: {
            estado: true
        }
    });

    // Formatear las fechas en cada tarea
    const TasksFormateadas = Tasks.map(task => {
        return {
            ...task,
            fecha_creacion: formatFecha(task.fecha_creacion),
            fecha_limite: formatFecha(task.fecha_limite)
        };
    });

    return TasksFormateadas;
}
export const getTaskById = async (id) => {
    const Task = await prisma.task.findUnique({
        where: {
            id: Number(id),
            estado: true
        }
    });

    if (!Task) {
        return null;
    }

    // Formatear la fecha con hora y minutos
    const TaskFormateada = {
        ...Task,
        fecha_creacion: formatFecha(Task.fecha_creacion),
        fecha_limite: formatFecha(Task.fecha_limite)
    };

    return TaskFormateada;
}
export const deleteTask=async(id)=>{
    const Task=await prisma.task.update({
        where:{
            id:Number(id)
        },
        data:{
            estado:false
        }
    })
}
function formatFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    
    return `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`;
}