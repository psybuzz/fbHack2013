function picture() {
	return {
		width: 0,
		height: 0, 
		filled[],
		percentage: 0,
		num_pixels: 0,
		num_filled: 0

		function initilaize(im_width, im_height) {
			this.width = im_width;
			this.height = im_height;
			for (var i = 0; i < im_width; i++) {
				var row = [];
				for (var j = 0; j < im_height; j++) {
					row.push(0);
				}
				filled.push(row);
			}
			num_pixels = im_width * im_height;
		}

		function update() {
			for (var i = 0; i < this.width; i++) {
				for (var j = 0; j < this.height; j++) {
					var curr_pixel = overlayContext.getImageData(i, j, 1, 1).data;
					if (curr_pixel[0] != 0 || curr_pixel[1] != 0 || curr_pixel[2] != 0) {
						filled[i][j] = 1;
						num_filled++;
					}
				}
			}
		}

		function checkDone() {
			return num_filled >= (num_pixels * 9 / 10);
		}
	}
}
/*
function node(pixel_data, x_loc, y_loc) {
	return {
		x: x_loc,
		y: y_loc,
		filled: 0
	}
}*/