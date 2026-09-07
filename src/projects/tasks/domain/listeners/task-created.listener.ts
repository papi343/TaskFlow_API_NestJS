import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskCreatedEvent } from "../events/task-created.event";




@Injectable()
export class TaskCreatedListener{

    @OnEvent('task-created')
    handleTaskCreated(event:TaskCreatedEvent){
            console.log('nouvelle tache cree',event.task)
    }
}