import { Component, OnInit } from '@angular/core';
import { TableFileReaderService } from '../service/table-file-reader.service';
import { Group } from '../types/Group.type';
import { GameService } from '../service/game.service';
import { GameView } from '../types/GameView.type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  constructor(private readonly tableViewService: TableFileReaderService,
              private readonly gameService: GameService) { }

  public groups: Group[] = [];
  public schedule: string[] = [];

  ngOnInit() {
  }

  fileChanged(e: any) {
    const file = e.target.files[0];
    this.tableViewService.readFile(file);
  }

  loadFromText() {
    this.groups = this.tableViewService.createGroupsFromFile();
  }

  createTimeTableFromPlayers() {
    const firstGroup = this.groups[0];
    const players = firstGroup.players;
    const schedule: string[] = [];
    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i; j < players.length - 1; j++) {
        const pairing = players[i].name + ' : ' + players[j + 1].name;
        schedule.push(pairing);
        this.postGame(players[i].name, players[j + 1].name);
      }
    }
    this.schedule = schedule;
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe(
      (next) => console.log(next)
    );
  }

  postGame(homeName: string, awayName: string) {
    const gameView: GameView = {
      HomeName : homeName,
      AwayName: awayName,
      HomeGoals: 0,
      AwayGoals: 0
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
      AwayGoals: awayGoals
    };
    console.log(homeGoals);
    this.gameService.updateGame(gameView).subscribe(
      (next) => console.log('success2')
    );
  }

}
