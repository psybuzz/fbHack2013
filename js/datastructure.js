function picture() {
	return {
		width: 0,
		height: 0, 
		pixel[],

		function initilaize(im_width, im_height) {
			this.width = im_width;
			this.height = im_height;
			for (var i = 0; i < im_width; i++) {
				var row = [];
				for (var j = 0; j < im_height; j++) {
					row.push(new node(canvasOverlay.getImageData(i, j, 1, 1).data, i, j));
				}
				pixel.push(row);
			}
		}


	}
}

function node(pixel_data, x_loc, y_loc) {
	return {
		x: x_loc,
		y: y_loc,
		filled: 0,
		data: pixel_data
	}
}