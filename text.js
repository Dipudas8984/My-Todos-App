var obj = [
    {
        name: "harish",
        value: true
    },
    {
        name: "harry",
        value: true
    }
]

var newObj = obj.map(a => {
    a.value = false
    console.log(a);
    return a
})
console.log(newObj);