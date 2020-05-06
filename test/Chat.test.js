const Chat = artifacts.require('./Chat.sol')

contract('Chat', (accounts) => {
	let chat

	before(async () => {
		chat = await Chat.deployed()
		
	})

	describe('deployment', async() =>{
		it('deploys successfully', async() => {
			const address = await chat.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})
		it('has a name', async ()=> {
			const name = await chat.name()
			assert.equal(name, 'Harsh Shukla block')
		})
	})
      
     describe('message', async() =>{
       let result, cnt;
       before(async () => {
       	result = await chat.sendMessage('hello')
       	cnt = await chat.cnt()
       })

       it('sends meassage', async () =>{
       	assert.equal(cnt,1)
       	console.log(result.logs)
       }) 
	})






})