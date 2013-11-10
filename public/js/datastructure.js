function picture() {
	return {
		width: 0,
		height: 0, 
		filled: [],
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
				this.filled.push(row);
			}
			this.num_pixels = im_width * im_height / 4;
			this.x = x_value;
			this.y = y_value;
		},

		update: function() {
			this.num_filled = 0;
			for (var i = 0; i < this.width; i+=4) {
				for (var j = 0; j < this.height; j+=4) {
					var curr_pixel = overlayContext.getImageData(i, j, 1, 1).data;
					if (curr_pixel[0] != 0 || curr_pixel[1] != 0 || curr_pixel[2] != 0) {
						this.filled[i][j] = 1;
						this.num_filled++;
					}
				}
			}
		},

		move: function(x_dest, y_dest) {
			this.x = x_dest;
			this.y = y_dest;
		},

		checkDone: function() {
			// console.log(this.num_filled + " out of " + (this.num_pixels * .71 / 4));
			return this.num_filled >= (this.num_pixels * .71 / 4);
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