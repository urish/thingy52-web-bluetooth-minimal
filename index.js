// Thingy:52 Web Bluetooth Minimal Example
// Copyright (C) 2019, Uri Shaked
// Released under the MIT license

const ThingyMainService = 'ef680100-9b35-4933-9b10-52ffa9740042';
const ThingyUserInterfaceService = 'ef680300-9b35-4933-9b10-52ffa9740042';
const ThingyLEDCharacteristic = 'ef680301-9b35-4933-9b10-52ffa9740042';
const controlsElement = document.querySelector('#controls');

let ledCharacteristic = null;

async function connect() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: [ThingyMainService] }],
    optionalServices: [ThingyUserInterfaceService]
  });

  console.log('Connecting to device...');
  await device.gatt.connect();
  const service = await device.gatt.getPrimaryService(ThingyUserInterfaceService);
  ledCharacteristic = await service.getCharacteristic(ThingyLEDCharacteristic);
  controlsElement.removeAttribute('hidden');
}

async function setLEDColor(r, g, b) {
  const mode = 1; // 0 = off, 1 = on, 2 = breathe, 3 = one shot
  await ledCharacteristic.writeValue(new Uint8Array([mode, r, g, b]));
}
