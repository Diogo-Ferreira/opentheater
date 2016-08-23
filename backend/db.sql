CREATE TABLE 'User' (
	'id' INT NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'Room' (
	'id' INT NOT NULL,
	'torren_magnet_link' varchar(255),
	'joignable_after_start' BOOLEAN,
	'name' varchar,
	'admin' INT,
	'private' BOOLEAN,
	'max_spectators' INT DEFAULT '100',
	'description' varchar,
	PRIMARY KEY ('id')
);

CREATE TABLE 'Tag' (
	'id' INT NOT NULL,
	'name' varchar NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'ChatMessage' (
	'id' INT NOT NULL,
	'room' INT NOT NULL,
	'user' INT NOT NULL,
	'message' varchar NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'Poll' (
	'id' INT NOT NULL,
	'question' varchar NOT NULL,
	'room' varchar NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'PollVote' (
	'id' INT NOT NULL,
	'user' INT NOT NULL,
	'poll' INT NOT NULL,
	'answer' INT NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'RoomTag_Assoc' (
	'id' INT NOT NULL AUTO_INCREMENT,
	'tag' INT NOT NULL,
	'room' INT NOT NULL,
	PRIMARY KEY ('id')
);

CREATE TABLE 'PollAnswer' (
	'id' INT NOT NULL,
	'answer' varchar NOT NULL,
	'poll' INT NOT NULL,
	PRIMARY KEY ('id')
);

ALTER TABLE 'Room' ADD CONSTRAINT 'Room_fk0' FOREIGN KEY ('admin') REFERENCES 'User'('id');

ALTER TABLE 'ChatMessage' ADD CONSTRAINT 'ChatMessage_fk0' FOREIGN KEY ('room') REFERENCES 'Room'('id');

ALTER TABLE 'ChatMessage' ADD CONSTRAINT 'ChatMessage_fk1' FOREIGN KEY ('user') REFERENCES 'User'('id');

ALTER TABLE 'Poll' ADD CONSTRAINT 'Poll_fk0' FOREIGN KEY ('room') REFERENCES 'Room'('id');

ALTER TABLE 'PollVote' ADD CONSTRAINT 'PollVote_fk0' FOREIGN KEY ('user') REFERENCES 'User'('id');

ALTER TABLE 'PollVote' ADD CONSTRAINT 'PollVote_fk1' FOREIGN KEY ('poll') REFERENCES 'Poll'('id');

ALTER TABLE 'PollVote' ADD CONSTRAINT 'PollVote_fk2' FOREIGN KEY ('answer') REFERENCES 'PollAnswer'('id');

ALTER TABLE 'RoomTag_Assoc' ADD CONSTRAINT 'RoomTag_Assoc_fk0' FOREIGN KEY ('tag') REFERENCES 'Tag'('id');

ALTER TABLE 'RoomTag_Assoc' ADD CONSTRAINT 'RoomTag_Assoc_fk1' FOREIGN KEY ('room') REFERENCES 'Room'('id');

ALTER TABLE 'PollAnswer' ADD CONSTRAINT 'PollAnswer_fk0' FOREIGN KEY ('poll') REFERENCES 'Poll'('id');
