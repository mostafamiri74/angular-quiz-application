import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
    this.router.navigate(['/question']);
  }
}
