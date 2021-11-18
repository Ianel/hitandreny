const { test } =  require('jest');
const { playAudio } = require('../main');

test('play audios', () => {
    expect(playAudio).toBe(true);
});