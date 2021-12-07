import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public point: number = 0;
  public counter: number = 60;
  public progress: string = '0';
  public isQuizCompleted: boolean = false;

  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;

  interval$: any;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') as string;
    this.getAllQuestion();
    this.startCounter();
  }

  getAllQuestion() {
    this.questionService
      .getQuestionJson()
      .subscribe((res: any) => (this.questionList = res.questions));
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.point += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    } else {
      setTimeout(() => {
        this.point -= 10;
        this.inCorrectAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val: any) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion--;
        this.counter = 60;
        this.point -= 10;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.point = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();

    return this.progress;
  }
}
