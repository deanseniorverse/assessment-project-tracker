import { useMemo } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import {
  CoreStore,
  Provider,
  useStore,
} from "@packages/core/src/stores/CoreStore";
import { Button } from "@packages/ui/src/components/Button";
import { StatusBadge } from "@packages/core/src/components/StatusBadge";

/**
 * App - Main application component
 *
 * This demonstrates how the store, components, and state work together.
 * Candidates can use this to manually test their implementations.
 */
const App = () => {
  // Create store instance once
  const store = useMemo(() => CoreStore(), []);

  return (
    <Provider value={store}>
      <View className="min-h-screen bg-gray-50 p-8">
        <Header />
        <Main />
      </View>
    </Provider>
  );
};

const Header = () => (
  <View className="mb-8">
    <Text className="text-3xl font-bold text-gray-900">Project Tracker</Text>
    <Text className="text-gray-600 mt-2">
      Technical Assessment - Senior Frontend Developer
    </Text>
  </View>
);

const Main = observer(() => {
  const store = useStore();

  // Create sample data for testing
  const createSampleData = () => {
    const project = store.model.project.create({
      name: "Sample Project",
      description: "A sample project for testing",
      status: "active",
    });

    store.model.task.create({
      projectId: project.id,
      title: "Task 1 - Setup",
      status: "done",
      priority: "high",
    });

    store.model.task.create({
      projectId: project.id,
      title: "Task 2 - Implementation",
      status: "in-progress",
      priority: "medium",
    });

    store.model.task.create({
      projectId: project.id,
      title: "Task 3 - Testing",
      status: "todo",
      priority: "low",
    });
  };

  const projects = store.model.project.all;

  return (
    <View className="space-y-8">
      {/* Component Demo Section */}
      <View className="bg-white rounded-lg shadow p-6">
        <Text className="text-xl font-semibold mb-4">Component Demo</Text>

        <View className="space-y-4">
          {/* Button variants */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Button (Reference Implementation)
            </Text>
            <View className="flex flex-row gap-2 flex-wrap">
              <Button
                text="Primary"
                variants={{ theme: "primary", format: "solid" }}
              />
              <Button
                text="Secondary"
                variants={{ theme: "secondary", format: "outline" }}
              />
              <Button
                text="Ghost"
                variants={{ theme: "neutral", format: "ghost" }}
              />
            </View>
          </View>

          {/* StatusBadge - candidates implement this */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              StatusBadge (Module A - Candidate Implements)
            </Text>
            <View className="flex flex-row gap-2 flex-wrap">
              <StatusBadge status="todo" />
              <StatusBadge status="in-progress" />
              <StatusBadge status="done" />
            </View>
          </View>
        </View>
      </View>

      {/* Store Demo Section */}
      <View className="bg-white rounded-lg shadow p-6">
        <Text className="text-xl font-semibold mb-4">Store Demo</Text>

        <View className="mb-4">
          <Button
            text="Create Sample Project"
            variants={{ theme: "primary", format: "solid" }}
            onPress={createSampleData}
          />
        </View>

        {projects.length === 0 ? (
          <Text className="text-gray-500">
            No projects yet. Click the button above to create sample data.
          </Text>
        ) : (
          <View className="space-y-4">
            {projects.map((project) => (
              <View
                key={project.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <Text className="font-medium">{project.attr.name}</Text>
                <Text className="text-sm text-gray-600">
                  {project.attr.description}
                </Text>
                <View className="mt-2">
                  <StatusBadge
                    status={
                      project.attr.status === "active" ? "in-progress" : "done"
                    }
                  />
                </View>
                {/* Model extension demo */}
                {project.ext && (
                  <View className="mt-2 text-sm text-gray-500">
                    <Text>Display Name: {project.ext.displayName}</Text>
                    <Text>Task Count: {project.ext.taskCount}</Text>
                    <Text>Progress: {project.ext.progress}%</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Instructions */}
      <View className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <Text className="text-lg font-semibold text-blue-900 mb-2">
          Assessment Instructions
        </Text>
        <Text className="text-blue-800">
          Run `yarn test` to see failing tests. Implement the modules to make
          tests pass.
        </Text>
        <View className="mt-4 space-y-1">
          <Text className="text-blue-700">• Module A: StatusBadge.tsx</Text>
          <Text className="text-blue-700">
            • Module B: stores/models/project.ts
          </Text>
          <Text className="text-blue-700">• Module C: TaskCardState.ts</Text>
          <Text className="text-blue-700">
            • Module D: Write tests + implement ProjectFormState.ts
          </Text>
        </View>
      </View>
    </View>
  );
});

export default App;
