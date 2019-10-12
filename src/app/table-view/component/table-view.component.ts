import { Component, OnInit } from '@angular/core';
import { TableFileReaderService } from '../service/table-file-reader.service';
import { Group } from '../types/Group.type';
import { GameService } from '../service/game.service';
import { GameView } from '../types/GameView.type';
import { FormBuilder, Validators } from '@angular/forms';

enum groups {
  Gruppe1,
  Gruppe2,
  Gruppe3,
  Gruppe4
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {

  constructor(private readonly tableViewService: TableFileReaderService,
              private readonly gameService: GameService,
              private readonly fb: FormBuilder) { }

  private selectedGroup = groups.Gruppe1; 
  public groups: Group[] = [];
  public schedule: string[] = [];

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
    console.log(this.selectedGroup)
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe(
      (next) => console.log(next)
    );
  }

  postGame() {
    const gameView: GameView = {
      HomeName : this.newGameForm.controls.homePlayer.value,
      AwayName: this.newGameForm.controls.awayPlayer.value,
      HomeGoals: this.newGameForm.controls.homeGoals.value,
      AwayGoals: this.newGameForm.controls.awayGoals.value,
      GroupId: this.selectedGroup
    };
    console.log(gameView);
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
