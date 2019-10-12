import { Component, OnInit } from '@angular/core';
import { TableFileReaderService } from '../service/table-file-reader.service';
import { Group } from '../types/Group.type';
import { GameService } from '../service/game.service';
import { GameView } from '../types/GameView.type';
import { FormBuilder, Validators } from '@angular/forms';
import { Player } from '../types/Player.type';
import { Game } from '../types/Game.type';

enum groups {
  Gruppe1,
  Gruppe2,
  Gruppe3,
  Gruppe4
}

enum gameResult {
  HomeWin,
  Draw,
  AwayWin
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {

  constructor(private readonly gameService: GameService,
              private readonly fb: FormBuilder) { }

  private selectedGroup = groups.Gruppe1; 
  public games: Game[] = [];
  public playersOfGroup: Player[] = [];
  public table: Player[] = [];

  public newGameForm = this.fb.group({
    homePlayer : ['', Validators.required],
    homeGoals : ['', Validators.required],
    awayPlayer: ['', Validators.required],
    awayGoals: ['', Validators.required]
  });

  ngOnInit() {
  }

  selectGroup(group: number) {
    this.selectedGroup = group;
    this.showAllGamesOfGroup();
  }

  showAllGamesOfGroup() {
    this.gameService.getAllGamesOfGroup(this.selectedGroup).subscribe(
      (games) => {
        this.games = games;
        this.createAllPlayersOfGroup();
        this.updatePlayers();
      }
    );
  }

  private createAllPlayersOfGroup() {
    const playersOfGroup: Player[] = [];
    for (const game of this.games) {
      if (!this.isInArray(game.homePlayer, playersOfGroup)) {
        playersOfGroup.push({name: game.homePlayer, gamesPlayed: 0, points:0, goalsScored: 0, goalsConceeded: 0 });
      }
      if (!this.isInArray(game.awayPlayer, playersOfGroup)) {
        playersOfGroup.push({name: game.awayPlayer, gamesPlayed: 0, points:0, goalsScored: 0, goalsConceeded: 0 });
      }
    }
    this.playersOfGroup = playersOfGroup;
  }

  private updatePlayers() {
    for (const game of this.games) {
      const result = this.figureOutResult(game);
      this.updatePlayerData(result, game);
      this.table = this.sortArrayForTable(this.playersOfGroup);
    }
  }

  private figureOutResult(game: Game): gameResult {
    if (game.homeGoals > game.awayGoals) {
      return gameResult.HomeWin;
    }
    if (game.awayGoals > game.homeGoals) {
      return gameResult.AwayWin;
    }
    return gameResult.Draw;
  }

  private updatePlayerData(result: gameResult, game: Game) {
    if (result === gameResult.HomeWin) {
      for (const player of this.playersOfGroup) {
        if (player.name === game.homePlayer) {
          player.points = player.points + 3;
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.homeGoals;
          player.goalsConceeded = player.goalsConceeded + game.awayGoals;
        }
        if (player.name === game.awayPlayer) {
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.awayGoals;
          player.goalsConceeded = player.goalsConceeded + game.homeGoals;
        }
      }
    }
    if (result === gameResult.AwayWin) {
      for (const player of this.playersOfGroup) {
        if (player.name === game.awayPlayer) {
          player.points = player.points + 3;
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.awayGoals;
          player.goalsConceeded = player.goalsConceeded + game.homeGoals;
        }
        if (player.name === game.homePlayer) {
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.homeGoals;
          player.goalsConceeded = player.goalsConceeded + game.awayGoals;
        }
      }
    }
    if (result === gameResult.Draw) {
      for (const player of this.playersOfGroup) {
        if (player.name === game.homePlayer) {
          player.points = player.points + 1;
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.homeGoals;
          player.goalsConceeded = player.goalsConceeded + game.awayGoals;
        }
        if (player.name === game.awayPlayer) {
          player.points = player.points + 1;
          player.gamesPlayed++;
          player.goalsScored = player.goalsScored + game.awayGoals;
          player.goalsConceeded = player.goalsConceeded + game.homeGoals;
        }
      }
    }
  }

  private sortArrayForTable(playersOfGroup: Player[]) {
    playersOfGroup.sort((a, b) => {
      if (a.points < b.points) { return 1; }
      if (a.points > b.points) { return -1;  }
      if (a.points === b.points) {
        if (a.goalsScored - a.goalsConceeded < b.goalsScored- b.goalsConceeded) { return 1; }
        if (a.goalsScored - a.goalsConceeded > b.goalsScored- b.goalsConceeded) { return -1; }
      }
      return 0;
   });
    return playersOfGroup;
  }


  private isInArray(playerName: string, existingPlayer: Player[]): boolean {
    for (const playerInArray of existingPlayer) {
      if (playerInArray.name === playerName) {
        return true;
      }
    }
    return false;
  }

  postGame() {
    const gameView: GameView = {
      HomeName : this.newGameForm.controls.homePlayer.value,
      AwayName: this.newGameForm.controls.awayPlayer.value,
      HomeGoals: this.newGameForm.controls.homeGoals.value,
      AwayGoals: this.newGameForm.controls.awayGoals.value,
      GroupId: this.selectedGroup
    };
    this.gameService.postNewGame(gameView).subscribe(
      (next) => console.log('success')
    );
  }

  updateGame(homeGoals: number, awayGoals: number) {
    const gameView: GameView = {
      HomeName : 'Mark',
      AwayName: 'Leon',
      HomeGoals: homeGoals,
      AwayGoals: awayGoals,
      GroupId: this.selectedGroup
    };
    console.log(homeGoals);
    this.gameService.updateGame(gameView).subscribe(
      (next) => console.log('success2')
    );
  }

}
