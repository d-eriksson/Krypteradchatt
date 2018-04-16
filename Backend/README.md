# How to use the RESTful webservice

The backend root can be found at http://83.227.100.223:8080. This doesn't work on iOS since it's not a https connection but this will be fixed eventually.

## http://83.227.100.223:8080/create/
this http-request will create a chatroom and return the roomID.

Input:
none

Output:
LAST_INSERT_ID():	X

## http://83.227.100.223:8080/connect/:roomID
this http-request will connect to a chatroom and alter the connected state from 0 to 1.

Input:
:roomID - the ID of the room you wish to connect to 

Output:
"Connected"

## http://83.227.100.223:8080/messages/:roomID/
this http-request will connect to a chatroom and return all the messages that has ever been written in that room.

Input:
:roomID - the ID of the room you wish to connect to 

Output:
0:{
	roomID : X
	message : "text"
	sentby: 1 or 2 (depending on who sent the message)
	send_time: "YYYY-MM-DDTHH:MM:SS.000Z"
}

## http://83.227.100.223:8080/messages/:roomID/:time
this http-request will connect to a chatroom and return all the messages that has a send_time after the time given.

Input:
:roomID - the ID of the room you wish to connect to
:time - the time that will be used to filter the output

Output:
0:{
	roomID : X
	message : "text"
	sentby: 1 or 2 (depending on who sent the message)
	send_time: "YYYY-MM-DDTHH:MM:SS.000Z"
}
## http://83.227.100.223:8080/lastmessage/:roomID
this will return the last message that was sent in the chatroom 

## http://83.227.100.223:8080/submit/:roomID/:message/:sentby
this http-request will connect to a chatroom and submit a message to the database.

Input:
:roomID - the ID of the room you wish to connect to.
:message - the message that will be submited.
:sentby - either 1 or 2 depending on who sent the message.

Output:
None

## http://83.227.100.223:8080/clear/
this clears all chats that are not connected and was created for longer than 30 minutes ago this runs every hour at minute 59. 

## http://83.227.100.223:8080/listchatts/
this lists all the chatts that are available, 
