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
gamma = 0.75 # Discount factor 
alpha = 0.5 # Learning rate

"""def get_optimal_route(start_location,end_location):
    # Copy the rewards matrix to new Matrix
    rewards_new = np.copy(rewards)
    
    # Get the ending state corresponding to the ending location as given
    ending_state = location_to_state[end_location]
    
    # With the above information automatically set the priority of  
    # the given ending state to the highest one
    rewards_new[ending_state,ending_state] = 999

    # -----------Q-Learning algorithm-----------
   
    # Initializing Q-Values
    Q = np.array(np.zeros([20,20]))

    # Q-Learning process
    for i in range(10000):
        # Pick up a start state randomly
        current_state = np.random.randint(0,20) # Python excludes the upper bound
        
        # For traversing through the neighbor locations in the maze
        playable_actions = []
        
        # Iterate through the new rewards matrix and get the actions > 0
        for j in range(20):
            if rewards_new[current_state,j] > 0:
                playable_actions.append(j)
        
        # Pick an action randomly from the list of playable actions  
        # leading us to the next state
        next_state = np.random.choice(playable_actions)
        
        # Compute the temporal difference
        # The action here exactly refers to going to the next state
        TD = rewards_new[current_state,next_state] + gamma * Q[next_state,np.argmax(Q[next_state,])] - Q[current_state,next_state]
        
        # Update the Q-Value using the Bellman equation
        Q[current_state,next_state] += alpha * TD

    # Initialize the optimal route with the starting location
    route = [start_location]
    # We do not know about the next location yet, so initialize with the value of 
    # starting location
    next_location = start_location
    
    # We don't know about the exact number of iterations
    # needed to reach to the final location hence while loop will be a good choice 
    # for iteratiing
    
    while(next_location != end_location):
        # Fetch the starting state
        starting_state = location_to_state[start_location]
        
        # Fetch the highest Q-value pertaining to starting state
        next_state = np.argmax(Q[starting_state,])
        
        # We got the index of the next state. But we need the corresponding letter. 
        next_location = state_to_location[next_state]
        route.append(next_location)
        
        # Update the starting location for the next iteration
        start_location = next_location
    
    return route
"""
##########

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
            next_location = self.state_to_location[next_state]
            route.append(next_location)
            start_location = next_location
        
        print(route)
        return route

def to_excel(array):
    """store data in excel
    """
    workbook = xlsxwriter.Workbook('arrays.xlsx')
    worksheet = workbook.add_worksheet()

    row = 0

    for col, data in enumerate(array):
        worksheet.write_column(row, col, data)

    workbook.close()
        
        
qagent = QAgent(alpha, gamma, location_to_state, actions, rewards,  state_to_location, np.array(np.zeros([20,20])))
for i in range(10):
  to_excel(qagent.training('1C', '5N1', 1000))
#wrong type

#qagent.training('1C', '5N1', 1000)
#print (qagent.training('1C', '5N1', 1000))
#to_excel(qagent.training('1C', '5N1', 1000))


"""['a1', 'a2', 'a3'],
          ['a4', 'a5', 'a6'],
          ['a7', 'a8', 'a9'],
          ['a10', 'a11', 'a12', 'a13', 'a14','TestingP']"""
