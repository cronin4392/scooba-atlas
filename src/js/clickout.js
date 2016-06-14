function Clickout(el, callback) {
	if(!el) {
		return false;
	}

	this.el = el;
	this.callback = callback;

	this.clickoutHander = null;
}

Clickout.prototype.activate = function() {
	this.clickoutHander = detectClickout.bind(this);

	document.addEventListener('click', this.clickoutHander, true);
}

Clickout.prototype.deactivate = function() {
	document.removeEventListener('click', this.clickoutHander, true);
}

function isDescendant(parent, child) {
	var node = child.parentNode;
	while (node != null) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

function detectClickout(e) {
	if( !isDescendant(this.el, e.target) ) {
		this.callback && this.callback();
	}
}