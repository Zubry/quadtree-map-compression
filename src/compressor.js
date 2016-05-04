function to2D(map, w){
  let result = [];

  map.forEach((value, index) => {
    const x = index % w;
    const y = Math.floor(index / w);

    if (!result[y]) {
      result[y] = [];
    }

    result[y][x] = value;
  });

  return result;
}

function isUniform(map) {
  const match = map[0][0];

  return map.every((row) => row.filter((cell) => cell !== match).length === 0);
}

function split(map, x, y) {
  const height = map.length;
  const top = map.slice(0, Math.ceil(height / 2));
  const bottom = map.slice(Math.floor(height / 2), height);

  const topLeft = top.map((row) => row.slice(0, Math.ceil(row.length / 2)));
  const topRight = top.map((row) => row.slice(Math.floor(row.length / 2), row.length));
  const bottomLeft = bottom.map((row) => row.slice(0, Math.ceil(row.length / 2)));
  const bottomRight = bottom.map((row) => row.slice(Math.floor(row.length / 2), row.length));

  return [
    [topLeft, x, y],
    [topRight, x + Math.floor(map[0].length / 2), y],
    [bottomLeft, x, y + Math.floor(height / 2)],
    [bottomRight, x + Math.floor(map[0].length / 2), y + Math.floor(height / 2)]
  ];
}

function compressr(map, x, y) {
  if(map.length === 0){
    return map;
  }

  const quadrants = split(map, x, y);

  return quadrants
    .map(([q, x, y]) => {
      if(isUniform(q)){
        return {
          x,
          y,
          width: q[0].length,
          value: q[0][0],
        };
      }else{
        return compressr(q, x, y);
      }
    });
}

function flatten(array, mutable) {
    var toString = Object.prototype.toString;
    var arrayTypeStr = '[object Array]';

    var result = [];
    var nodes = (mutable && array) || array.slice();
    var node;

    if (!array.length) {
        return result;
    }

    node = nodes.pop();

    do {
        if (toString.call(node) === arrayTypeStr) {
            nodes.push.apply(nodes, node);
        } else {
            result.push(node);
        }
    } while (nodes.length && (node = nodes.pop()) !== undefined);

    result.reverse(); // we reverse result to restore the original order
    return result;
}

function compress(map) {
  const map2d = to2D(map, 64);

  return flatten(compressr(map2d, 0, 0))
    .map(({x, y, width, value}) => `[${x},${y},${width},${value}]`)
    .join('');
}

const ex = {
  compress,
};

export default ex;
