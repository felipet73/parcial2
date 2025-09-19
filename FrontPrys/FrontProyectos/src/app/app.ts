import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, HttpClientModule,],
  templateUrl: './app.html',
  styleUrl: './app.css',  
})
export class App {
  protected readonly title = signal('FrontProyectos');
}
