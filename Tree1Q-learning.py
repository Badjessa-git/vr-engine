import numpy as np
import xlsxwriter

# Define the states
location_to_state = {
    '1D' : 0,
    '1N1' : 1,
    '1N2' : 2,
    '1C' : 3,
    '2D' : 4,
    '2N1' : 5,
    '2N2' : 6,
    '2C' : 7,
    '3D' : 8,
    '3N1' : 9,
    '3N2' : 10,
    '3C' : 11,
    '4D' : 12,
    '4N1' : 13,
    '4N2' : 14,
    '4C' : 15,
    '5D' : 16,
    '5N1' : 17,
    '5N2' : 18,
    '5C' : 19
}

# Define the actions
actions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]


# Define the rewards
rewards = np.array([[1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]])

# Maps indices to locations
state_to_location = dict((state,location) for location,state in location_to_state.items())

# Initialize parameters
gamma = 0.75 # Discount factor (discounts previos rewards)
alpha = 0.9 # Learning rate

class QAgent():
    
    # Initialize alpha, gamma, states, actions, rewards, and Q-values
    def __init__(self, alpha, gamma, location_to_state, actions, rewards, state_to_location, Q):
        
        self.gamma = gamma  
        self.alpha = alpha 
        
        self.location_to_state = location_to_state
        self.actions = actions
        self.rewards = rewards
        self.state_to_location = state_to_location
        
        self.Q = Q
        
    # Training the robot in the environment
    def training(self, start_location, end_location, iterations):
        
        rewards_new = np.copy(self.rewards)
        
        ending_state = self.location_to_state[end_location]
        rewards_new[ending_state, ending_state] = 999
        
        for i in range(iterations):
            current_state = np.random.randint(0,20) 
            playable_actions = []

            for j in range(20):
                if rewards_new[current_state,j] > 0:
                    playable_actions.append(j)
    
            next_state = np.random.choice(playable_actions)
            TD = rewards_new[current_state,next_state] + \
                    self.gamma * self.Q[next_state, np.argmax(self.Q[next_state,])] - self.Q[current_state,next_state]
            #print selfQ tables
            #compare ovetlapping Q values
            #even w/o same value could encode same policy (where max/mins are)
            self.Q[current_state,next_state] += self.alpha * TD

        route = [start_location]
        next_location = start_location
        
        # Get the route 
        return self.get_optimal_route(start_location, end_location, next_location, route, self.Q)
        
    # Get the optimal route
    def get_optimal_route(self, start_location, end_location, next_location, route, Q):
        
        while(next_location != end_location):
            starting_state = self.location_to_state[start_location]
            next_state = np.argmax(Q[starting_state,])
            #episilon?
            next_location = self.state_to_location[next_state]
            route.append(next_location)
            start_location = next_location
        
        #print(route)
        return route

def to_excel(array):
    """store data in excel
    """
    workbook = xlsxwriter.Workbook('1C_5N1.xlsx')
    worksheet = workbook.add_worksheet()

    row = 0

    for col, data in enumerate(array):
        worksheet.write_column(row, col, data)

    workbook.close()
        
        
qagent = QAgent(alpha, gamma, location_to_state, actions, rewards,  state_to_location, np.array(np.zeros([20,20])))
store_list = []
for i in range(100): #seems to find prefered path and stick to it?
  store_list.append(qagent.training('1C', '5N1', 1000))

to_excel(store_list)
#qagent.training('1C', '5N1', 1000)
#print (qagent.training('1C', '5N1', 1000))
#to_excel(qagent.training('1C', '5N1', 1000))


