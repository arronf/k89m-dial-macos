const HID = require('node-hid');
const robot = require('robotjs');

( async ()=> {
	// the dial
	let devpath = HID.devices().find( d => d.manufacturer == 'SONiX' && d.product == 'USB-Keyboard').path
	const dev = await HID.HIDAsync.open(devpath);
	dev.on('data', d => {
		const hexs = d.toString('hex');
		console.log(hexs);
		if( hexs.startsWith('08c800')){	// CW
			robot.keyTap('audio_vol_up');
		}else if( hexs.startsWith('0838ff')){	// CCW
			robot.keyTap('audio_vol_down');
		}else if( hexs.startsWith(080100) ){	// click on dial
			robot.keyTap('audio_pause');
		}
		//robot.scrollMouse(0,10);
	});
})();
