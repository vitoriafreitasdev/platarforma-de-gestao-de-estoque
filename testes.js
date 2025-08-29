const teste = [
      {
        "productId": "RTX 3090"
      },
      {
        "productId": "RTX 3090"
      },
      {
        "productId": "68b08f337f6b612b78ad538c"
      },
      {
        "productId": "68b08f337f6b543b78ad345f"
      },
      {
        "productId": "68b08f337cf5612b78ad345g"
      },
      {
        "productId": "68b08f337f642d2b78ad345a"
      },
      {
        "productId": "68b08f337f6b612b78ad538c"
      }
    ]

const filterId = "68b08f337f6b612b78ad538c"
const uptade = teste.filter(p => p.productId !== filterId);
console.log(uptade)