import { Injectable } from '@angular/core';
import { Group } from '../types/Group.type';
import { Player } from '../types/Player.type';

@Injectable({
  providedIn: 'root'
})
export class TableFileReaderService {

  public fileText: string | undefined;

  constructor() { }

  public readFile(file: any) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      this.fileText = fileReader.result.toString();
    };
  }

  public createGroupsFromFile(): Group[] {
    const groups: string[] = this.fileText.split(';');
    const formattedGroups: string[] = this.removeFileMeta(groups);
    const returnGroups = [];
    for (const group of formattedGroups) {
      returnGroups.push(this.createGroupsFromArray(group));
    }
    return returnGroups;
  }

  private removeFileMeta(groups: string[]): string[] {
    const returnArr = [];
    for (let i = 0; i < groups.length; i++) {
      let formattedString = groups[i].replace('\n', '');
      formattedString = formattedString.replace('\r', '');
      if (formattedString !== '') {
        returnArr.push(formattedString);
      }
    }
    return returnArr;
  }

  private createGroupsFromArray(playersInGroup: string): Group {
    const group = new Group();
    group.players = [];
    const players: string[] = playersInGroup.split(' ');
    for (const playerName of players) {
      const player = new Player();
      player.name =  playerName;
      group.players.push(player);
    }
    return group;
  }

}


