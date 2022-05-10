import { AppVm } from "../AppVm";

describe("AppVm", () => {
  let vm: AppVm;

  beforeEach(async () => {
    vm = new AppVm();
    await vm.init();
  });

  test("has required properties", () => {
    expect(vm).toBeDefined();
    expect(vm.isReady).toBe(true);

    expect(vm.divisionOptions).toBeDefined();
    expect(vm.countOptions).toBeDefined();
    expect(vm.startingOptions).toBeDefined();

    expect(vm.title).toBeDefined();
    expect(vm.division).toBeDefined();
    expect(vm.count).toBeDefined();
    expect(vm.starting).toBeDefined();
    expect(vm.text).toBeDefined();

    expect(vm.setTitle).toBeDefined();
    expect(vm.setDivision).toBeDefined();
    expect(vm.setCount).toBeDefined();
    expect(vm.setStarting).toBeDefined();
    expect(vm.setText).toBeDefined();
  });

  test("initializes to starting options, and can change values", () => {
    expect(vm.title).toBe("My Multi Week Plan");
    expect(vm.division).toBe(vm.divisionOptions[0].value);
    expect(vm.count).toBe(vm.countOptions[0].value);
    expect(vm.starting).toBe(vm.startingOptions[0].value);
    expect(vm.text).toBe("My one thing for this division is...");

    const newTitle = "Learning Document";
    const newDivision = vm.divisionOptions[1].value;
    const newCount = vm.countOptions[1].value;
    const newStarting = vm.startingOptions[1].value;
    const newText = "This division I will learn...";

    vm.setTitle(newTitle);
    vm.setDivision(newDivision);
    vm.setCount(newCount);
    vm.setStarting(newStarting);
    vm.setText(newText);

    expect(vm.title).toBe(newTitle);
    expect(vm.division).toBe(newDivision);
    expect(vm.count).toBe(newCount);
    expect(vm.starting).toBe(newStarting);
    expect(vm.text).toBe(newText);
  });

  test("can create correct divisions from data", () => {
    const divisions = vm.getDivisions();

    expect(divisions.length).toBe(8);

    expect(divisions[0]).toEqual({
      number: "1",
      starting: "Mon 09 May",
      ending: "Sun 15 May",
      text: "My one thing for this division is...",
    });

    expect(divisions.at(-1)).toEqual({
      number: "8",
      starting: "Mon 27 Jun",
      ending: "Sun 03 Jul",
      text: "My one thing for this division is...",
    });
  });
});
