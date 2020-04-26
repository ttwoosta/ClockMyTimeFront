import * as React from 'react';
import { connect } from 'react-redux';
import './styles.css';

const MessageBoard = () => (
    <div>
        <h1>Message Board</h1>
        <div className="container">
            
            <div className="chatbox">

                <div className="chatlogs">

                    <div className="chat friend">
                        <div className="user-photo"></div>
                        <p className="chat-message">What's up, Brother..!!</p>
                    </div>
                    <div className="chat self">
                        <div className="user-photo"><img src="Images/user_1.png" />
                            <p className="chat-message">What's up..!!</p>
                        </div>
                        <div className="chat friend">
                            <div className="user-photo"></div>
                            <p className="chat-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero itaque illum dolore? Consequuntur perspiciatis sequi ratione consequatur perferendis? Rem nihil ipsa nemo maxime, necessitatibus ratione quo totam quos suscipit. Perferendis!</p>
                        </div>
                        <div className="chat friend">
                            <div className="user-photo"></div>
                            <p className="chat-message">What's up, Brother..!!</p>
                        </div>
                        <div className="chat self">
                            <div className="user-photo"><img src="Images/user_1.png" />
                                <p className="chat-message">What's up..!!</p>
                            </div>
                            <div className="chat friend">
                                <div className="user-photo"></div>
                                <p className="chat-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero itaque illum dolore? Consequuntur perspiciatis sequi ratione consequatur perferendis? Rem nihil ipsa nemo maxime, necessitatibus ratione quo totam quos suscipit. Perferendis!</p>
                            </div>

                        </div>

                        <div className="chat-form">
                            <textarea></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default connect()(MessageBoard);