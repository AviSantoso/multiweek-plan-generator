import moment from "moment";

import { AviSelectOption } from "./components/avi/AviSelect";
import { toDate } from "./helpers/toDate";
import { IDivision } from "./types/IDivision";
import { IViewModel } from "./types/IViewModel";

export class AppVm implements IViewModel {
  public divisionOptions: AviSelectOption[];
  public countOptions: AviSelectOption[];
  public startingOptions: AviSelectOption[];

  public title: string;
  public division: string;
  public count: string;
  public starting: string;
  public text: string;

  public isReady: boolean;

  constructor() {
    this.isReady = false;

    this.divisionOptions = [
      { value: "1", text: "Week" },
      { value: "2", text: "Fortnight" },
      { value: "4", text: "Month" },
    ];

    this.startingOptions = (() => {
      const options = [];
      let time = moment().day(1);
      for (let i = 0; i < 8; i++) {
        const value = time.toISOString();
        const text = toDate(time);
        options.push({ value, text });
        time.add(1, "w");
      }
      return options;
    })();

    this.countOptions = Array.from(new Array(13)).map((_, i) => {
      const item = `${i + 8}`;
      return { value: item, text: item };
    });

    this.title = "My Multi Week Plan";
    this.division = this.divisionOptions[0].value;
    this.count = this.countOptions[0].value;
    this.starting = this.startingOptions[0].value;
    this.text = "My one thing for this division is...";
  }

  async init() {
    this.isReady = true;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setDivision(division: string) {
    this.division = division;
  }

  public setCount(count: string) {
    this.count = count;
  }

  public setStarting(starting: string) {
    this.starting = starting;
  }

  public setText(text: string) {
    this.text = text;
  }

  public getDivisions() {
    const divisions: IDivision[] = [];
    for (let i = 0; i < parseInt(this.count); i++) {
      const startingWeeks = parseInt(this.division) * i;
      const endingWeeks = parseInt(this.division) * (i + 1);
      divisions.push({
        number: `${i + 1}`,
        starting: toDate(moment(this.starting).add(startingWeeks, "weeks")),
        ending: toDate(
          moment(this.starting).add(endingWeeks, "weeks").add(-1, "days")
        ),
        text: this.text,
      });
    }
    return divisions;
  }
}
