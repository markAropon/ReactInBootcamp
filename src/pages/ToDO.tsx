import { 
  Header, 
  Footer, 
  TodoProvider, 
  TodoSidebar, 
  TodoListView
} from "../Components/ToDo/Index";
import PageAnimation from "@/common/PageAnimation";

function ToDo() {
  return (
    <PageAnimation keyValue="todo-page">
      <TodoProvider>
        <div className="grid grid-rows-[auto_1fr_auto] h-[100vh] max-h-[100vh] overflow-hidden bg-gray-50">
          <div className="shrink-0 h-12 bg-white shadow-sm z-10">
              <Header />
          </div>
          
          <div className="overflow-hidden grid grid-cols-1 md:grid-cols-[250px_1fr]">
            <div className="h-full overflow-hidden bg-white shadow-md z-[5]">
              <div className="h-full overflow-hidden">
                <TodoSidebar />
              </div>
            </div>
              
            <div className="overflow-hidden h-full">
                <TodoListView />
            </div>
          </div> 
            <div className="shrink-0 h-8 bg-white shadow-sm z-10">
              <Footer copyright="© 2025 Todo App - Manage your tasks" />
            </div>
        </div>
      </TodoProvider>
    </PageAnimation>
  );
}  

export default ToDo;