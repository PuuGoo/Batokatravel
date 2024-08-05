import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-checkbox-overview-example',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-overview-example.component.html',
  styleUrl: './checkbox-overview-example.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxOverviewExampleComponent {
  // readonly: chỉ đọc, signal có thể đọc hoặc viết có set và update



  readonly task = signal<Task>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      {
        name: 'Child task 1',
        completed: false,
      },
      {
        name: 'Child task 2',
        completed: false,
      },
      {
        name: 'Child task 3',
        completed: false,
      },
    ],
  });

  // computed dành cho signal đọc phụ thuộc vào tính hiệu khác. Tín hiệu khác ở đây là task. Khi tín hiệu task được update thì tín hiệu partiallyComplete sẽ được cập nhật
  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return (
      task.subtasks.some((t) => t.completed) &&
      !task.subtasks.every((t) => t.completed)
    );
  });

  update(event: any, index?: number) {
    console.log(event.target.checked);
    console.log(index);

    let completed : boolean = event.target.checked;

    this.task.update((task) => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach((t) => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every((t) => t.completed) ?? true;
      }
      console.log({ ...task });

      return { ...task };
    });
  }

  constructor() {
    // const count = signal(8);
    // // Signals are getter functions - calling them reads their value.
    // console.log('The count is: ' + count());
    // count.set(10);
    // console.log('The count is: ' + count());
    // count.update(value => value +1);
    // console.log('The count is: ' + count());
    // console.log(this.task().subtasks?.some(t => t.completed) && !this.task().subtasks?.every(t => t.completed));
  }
}
