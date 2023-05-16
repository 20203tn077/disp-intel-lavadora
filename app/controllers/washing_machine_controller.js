const offClass = "text-bg-secondary";
const onClass = "text-bg-success";

class WashingMachine {
  _on;
  _waterLevel;
  _washingLevel;
  _washingTime;
  _rinse;
  _washing;

  _viewModel = {
    on: offClass,
    waterLevel1: offClass,
    waterLevel2: offClass,
    waterLevel3: offClass,
    waterLevel4: offClass,
    waterLevel5: offClass,
    washingLevelNormal: offClass,
    washingLevelMedium: offClass,
    washingLevelHeavy: offClass,
    washingTime10: offClass,
    washingTime15: offClass,
    washingTime20: offClass,
    washingTime25: offClass,
    washingTime30: offClass,
    rinse1: offClass,
    rinse2: offClass,
    rinse3: offClass,
    washing: offClass,
  };

  constructor() {
    this.on = true;
  }

  get on() {
    return this._on;
  }

  set on(value) {
    this._on = value;
    this._translateToModel("on", value);
    if (value) {
      this._waterLevel = 2;
      this._washing = false;
      this._washingLevel = "normal";
      this._washingTime = 15;
      this._rinse = 1;
      this._translateToModel("waterLevel", 2);
      this._translateToModel("washing", false);
      this._translateToModel("washingLevel", "normal");
      this._translateToModel("washingTime", 15);
      this._translateToModel("rinse", 1);
    } else {
      this._waterLevel = null;
      this._washingLevel = null;
      this._washingTime = null;
      this._rinse = null;
      this._washing = null;
      this._translateToModel("waterLevel", null);
      this._translateToModel("washingLevel", null);
      this._translateToModel("washingTime", null);
      this._translateToModel("rinse", null);
      this._translateToModel("washing", null);
    }
    this._render();
  }

  get waterLevel() {
    return this._waterLevel;
  }

  set waterLevel(value) {
    if (this.on && !this.washing) {
      this._waterLevel = value;
      this._translateToModel("waterLevel", value);
      this._render();
    }
  }

  get washingLevel() {
    return this._washingLevel;
  }

  set washingLevel(value) {
    if (this.on && !this.washing) {
      this._washingLevel = value;
      this._translateToModel("washingLevel", value);
      this._render();
    }
  }

  get washingTime() {
    return this._washingTime;
  }

  set washingTime(value) {
    if (this.on && !this.washing) {
      this._washingTime = value;
      this._translateToModel("washingTime", value);
      this._render();
    }
  }

  get rinse() {
    return this._rinse;
  }

  set rinse(value) {
    if (this.on && !this.washing) {
      this._rinse = value;
      this._translateToModel("rinse", value);
      this._render();
    }
  }

  get washing() {
    return this._washing;
  }
  set washing(value) {
    if (this.on && !this.washing) {
      this._washing = value;
      this._translateToModel("washing", value);
      this._render();
    }
  }

  _render() {
    render("washingMachine", this._viewModel);
  }

  _translateToModel(prop, value) {
    const valueSet = {
      on: {
        true: "on",
      },
      waterLevel: {
        1: "waterLevel1",
        2: "waterLevel2",
        3: "waterLevel3",
        4: "waterLevel4",
        5: "waterLevel5",
      },
      washingLevel: {
        normal: "washingLevelNormal",
        medio: "washingLevelMedium",
        pesado: "washingLevelHeavy",
      },
      washingTime: {
        10: "washingTime10",
        15: "washingTime15",
        20: "washingTime20",
        25: "washingTime25",
        30: "washingTime30",
      },
      rinse: {
        1: "rinse1",
        2: "rinse2",
        3: "rinse3",
      },
      washing: {
        true: "washing",
      },
    }[prop];
    for (const target of Object.values(valueSet)) {
      this._viewModel[target] = offClass;
    }
    const target = valueSet[value];
    this._viewModel[target] = onClass;
  }
}

const washingMachine = new WashingMachine();

function getNext(value, array) {
  const nextIndex = array.indexOf(value) + 1;
  return nextIndex < array.length ? array[nextIndex] : array[0];
}

function toggle(prop) {
  const currValue = washingMachine[prop];
  washingMachine[prop] = getNext(
    currValue,
    {
      on: [true, false],
      waterLevel: [1, 2, 3, 4, 5],
      washingLevel: ["normal", "medio", "pesado"],
      washingTime: [10, 15, 20, 25, 30],
      rinse: [1, 2, 3],
      washing: [true, false],
    }[prop]
  );
}
