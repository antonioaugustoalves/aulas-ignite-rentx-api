describe("Create category", () =>{
    it("Espero que 2 + 2 = 4", () =>{
        const soma = 2+2;
        const result = 4;

        expect(soma).toBe(result);
    });

    it("Espero que 2 + 2 seja diferente de 5",() =>{
        const soma = 2+2;
        const result = 5;
        expect(soma).not.toBe(result);
    })
})