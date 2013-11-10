function picture() {
	return {
		width: 0,
		height: 0, 
		filled[],
		percentage: 0,
		num_pixels: 0,
		num_filled: 0,
		x: 0,
		y: 0,

		initialize: function(im_width, im_height, x_value, y_value) {
			this.width = im_width;
			this.height = im_height;
			for (var i = 0; i < im_width; i++) {
				var row = [];
				for (var j = 0; j < im_height; j++) {
					row.push(0);
				}
				filled.push(row);
			}
			this.num_pixels = im_width * im_height;
			this.x = x_value;
			this.y = y_value;
		},

		update: function() {
			for (var i = 0; i < this.width; i++) {
				for (var j = 0; j < this.height; j++) {
					var curr_pixel = overlayContext.getImageData(i, j, 1, 1).data;
					if (curr_pixel[0] != 0 || curr_pixel[1] != 0 || curr_pixel[2] != 0) {
						filled[i][j] = 1;
						num_filled++;
					}
				}
			}
		},

		move: function(x_dest, y_dest) {
			this.x = x_dest;
			this.y = y_dest;
		},

		checkDone: function() {
			return num_filled >= num_pixels * 9 / 10
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