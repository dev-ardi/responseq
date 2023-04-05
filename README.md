# AsyncQ

Async queue. This is a queue where you can post async requests and then get them one by one. It blocks until there is one promise available. This is *first responded first out*, rather than *first requested, first out*.

Example: 

```typescript
import ResponseQ from 'responseq';
async function getUsers(IDs: string[]) {
 const q = new ResponseQ(); // Create a new AsynQ instance
  for (const id of IDs) {
    q.push(async () => getUserFromDB(id)); // Push a function to the queue 
  }
  for (let i = 0; i < IDs.length; i++) {
    const user = await q.pop(); // Consume the output one by one
    frontend.drawUser(user);
  }
}
```
