// Mock of chrome://resources/js/load_time_data.js for standard web usage
export const loadTimeData = {
  valueExists(name) {
    return false;
  },
  getValue(name) {
    return null;
  },
  getString(name) {
    return '';
  }
};
