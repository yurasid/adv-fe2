function testFunction1() {
    console.log('Runing testFunction1');
}

function testFunction2() {
    document.querySelector('.page__title').style.color = randomColor();
}

function testFunction3() {
    document.body.style.backgroundColor = randomColor();
}

testFunction1();

testFunction2();

testFunction3();
