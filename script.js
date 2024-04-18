const Menu = document.getElementById("menu");
const Horario = document.getElementById("horario")
const Carrinho =  document.getElementById("carrinhoBotao");
const Modal = document.getElementById("carrinhoModal");
const cartItem = document.getElementById("cart-items");
const Total = document.getElementById("cart-total");
const checkout = document.getElementById("checkout");
const fecharModal = document.getElementById("close-modal");
const CountCart = document.getElementById("cart-count");
const Endereço = document.getElementById("Endereço");
const erro = document.getElementById("error");


let carrinho = []



     // abrir o modal do carrinho
    Carrinho.addEventListener("click", ()=>{
        updateCartModal();
        Modal.style.display = "flex"
    })

     //fechar o modal clicando pra fora da janela
    Modal.addEventListener("click", (event)=>{
         if(event.target === Modal){
            Modal.style.display = "none"
            
         }
    })
    // fechando o modal  clicando no botao fechar
    fecharModal.addEventListener("click", ()=>{
        Modal.style.display = 'none'
    })


    Menu.addEventListener('click',(event)=>{
         // console.log(event.target)
         let parentButton = event.target.closest(".botaoCarrinho")
        if(parentButton){
            const name = parentButton.getAttribute("data-name")
            const preço = parseFloat(parentButton.getAttribute("data-price"))
            // adicionar no carrinho
            addToCart(name,preço)
        }
    })

    // função para adicionar no carrinho

    function addToCart(name,preço){

        let itemExistente = carrinho.find(item=>item.name === name)
        if(itemExistente){
            // se o item ja existe aumenta a quantidade 

            itemExistente.quantidade += 1
        }else{
            carrinho.push({
                name,
                preço,
                quantidade: 1,
            })
    
        }
       
        updateCartModal()
    }

     function updateCartModal(){
       cartItem.innerHTML = ""
       let total = 0;

       carrinho.forEach(item=>{
           const cartItemElement = document.createElement("div")
           cartItemElement.innerHTML = `
            <div>
               <div>
                <p>${item.name}</p>
                <p>${item.quantidade}</p>
                <p>${item.preço}</p>
               </div>

               <div>
               <button>Remover</button>
               </div>
            </div>
           `
           cartItem.appendChild(cartItemElement)
       })
     }


