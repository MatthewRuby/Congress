function ease(current, target, increment) {
    var difference = target - current;

    if(Math.abs(difference) <= increment/100) {
        current = target;
    } else {
        current += difference * increment;
    }

    return current;
};

function map(position, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((position - min1) / (max1 - min1));
};

function deg_to_rad(n){
	return (Math.PI / 180) * n;
};