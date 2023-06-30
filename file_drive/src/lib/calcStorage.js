export function formatStorageSize(bytes=0) {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  let size;
  let unit;

  if (bytes < kb) {
    size = bytes;
    unit = 'B';
  } else if (bytes < mb) {
    size = bytes / kb;
    unit = 'KB';
  } else if (bytes < gb) {
    size = bytes / mb;
    unit = 'MB';
  } else {
    size = bytes / gb;
    unit = 'GB';
  }

  return size.toFixed(2) + ' ' + unit;
}

export function modifyForGraph(graphdata) {
  let data = graphdata.data;
  let unit = formatStorageSize(graphdata.totalStorageUsed).split(' ').pop();
  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
  const multiplier = units[unit];

  return {
    plot: data?.map(item => ({
      ...item,
      y: parseFloat((item.y / multiplier).toFixed(2)),
    })),
    unit: unit,
  };
}
