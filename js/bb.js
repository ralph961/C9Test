
function bb() {
	
};

bb.watermark = function (textfield, text, cssClass) {
	var setWatermark = function() {
		textfield.val(text).addClass(cssClass);
	};
	var unsetWatermark = function() {
		textfield.val('').removeClass(cssClass);
	};
	textfield.blur(function() {
		if (textfield.val().length == 0) {
			setWatermark();
		}
	}).focus(function() {
		if (textfield.val() == text) {
			unsetWatermark();
		}
	});
	setWatermark();
};

bb.sideToolbar = new function() {
	var isOpen = false;
	this.setup = function() {
		$j('.bb-side-toolbar-icons').click(bb.sideToolbar.toggle);
	};
	this.open = function() {
		if(!isOpen) {
			toggle();
		}
	};
	this.close = function() {
		if(isOpen) {
			toggle();
		}
	};
	this.toggle = function() {
		var movement = {"width": (isOpen? "0px": "489px")};
		$j('.bb-side-toolbar-content').toggleClass('invisible');
		$j(".bb-side-toolbar-content").animate(movement, "slow");
		isOpen = !isOpen;
	};
};

bb.feedbackForm = new function() {
	var writeHereMsg = 'Write here, we can take it!';
	var optionalMsg = 'optional';
	
	this.setWatermarks = function() {
		bb.watermark($j('.bb-feedback-form-textarea'), writeHereMsg, 'watermark');
		bb.watermark($j('.bb-feedback-form-name input'), optionalMsg, 'optionalWatermark');
		bb.watermark($j('.bb-feedback-form-email input'), optionalMsg, 'optionalWatermark');
	};
	
	this.setup = function() {
		var that = this;
		that.setWatermarks();
		$j('.bb-feedback-form').ajaxForm({
			beforeSubmit: function(formData, jqForm, options) {
				for(var i=0; i<formData.length; i++) {
					var formParam = formData[i];
					if(formParam.name == 'body') {
						if(formParam.value == writeHereMsg) {
							return false;
						}
					}else if(formParam.name == 'name') {
						if(formParam.value == optionalMsg) {
							formData.value = "";
						}
					}else if(formParam.name == 'email') {
						if(formParam.value == optionalMsg) {
							formData.value = "";
						}
					}
				}
				$j('#bb-feedback-send-button').attr('disabled','disabled');
			},
			success: function(responseText, statusText, xhr, $form) {
				if(xhr.status == 200) {
					$j('#bb-feedback-status').html("Thank You!");
				} else {
					$j('#bb-feedback-status').html("Failed - Retry later");
				}
				$j('#bb-feedback-send-button').removeAttr('disabled');
				that.setWatermarks();
				window.setTimeout(function() {
					that.close();
					$j('#bb-feedback-status').html("");
				}, 4000);
			}
		});
		
	};
	this.close = function() {
		$j('.bb-feedback').addClass('invisible');
	};
	this.open = function() {
		$j('.bb-feedback').removeClass('invisible');
	};
	this.toggle = function() {
		$j('.bb-feedback').toggleClass('invisible');
	};
};


bb.setup = function() {
	
	bb.sideToolbar.setup();
	bb.feedbackForm.setup();
	
};