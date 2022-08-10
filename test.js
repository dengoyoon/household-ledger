// curry는 f라는 함수 인자를 받아서 (a, ...bs) => {}라는 함수를 리턴한다는 뜻.
// const curry =
//     (f) =>
//     (a, ...bs) =>
//         //f의 인자로 2개 이상 들어왔다면 bs가 최소 1개 이상 있을 것
//         bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);

function curry(f) {
    return function (a) {
        return function (b) {
            return f(a, b);
        };
    };
}

const sum = curry((a, b) => a + b);

console.log(sum(4)(5));
