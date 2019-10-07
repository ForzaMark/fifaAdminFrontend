import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameView } from '../types/GameView.type';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly http: HttpClient) { }

  public getAllGames() {
    return this.http.get<any[]>('/api/Game');
  }

  public postNewGame(gameView: GameView) {
    return this.http.post<void>('/api/Game', gameView);
  }

  public updateGame(gameView: GameView) {
    return this.http.put<void>('/api/Game', gameView);
  }
}
