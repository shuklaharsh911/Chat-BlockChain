pragma solidity >=0.4.21 <0.6.0;
 
contract Chat {
	string public name;
    uint public cnt = 0;
    mapping(uint => Message) public message;

	struct Message {
	uint id;
	string msg;
	address sndr;  
	}
    
    event MessageSend(
    uint id,
    string msg,
	address sndr 
    );


	constructor() public {
	name = "Harsh Shukla block";
	}

	function sendMessage(string memory _mssg)public{
        cnt++;
        
        message[cnt] = Message(cnt, _mssg, msg.sender);

        emit MessageSend(cnt, _mssg, msg.sender);
	}
}