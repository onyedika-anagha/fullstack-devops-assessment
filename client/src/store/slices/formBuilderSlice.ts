import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:9000/api";

export interface Field {
  id: string;
  type:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select, radio, checkbox
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface Group {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  groups: Group[];
}

export interface Form {
  id?: number;
  title: string;
  description?: string;
  form_structure: Section[];
  created_at?: string;
  updated_at?: string;
}

interface FormBuilderState {
  currentForm: Form;
  savedForms: Form[];
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
}

const initialState: FormBuilderState = {
  currentForm: {
    title: "Untitled Form",
    description: "",
    form_structure: [],
  },
  savedForms: [],
  isLoading: false,
  error: null,
  isDirty: false,
};

// Async thunks
export const fetchForms = createAsyncThunk(
  "formBuilder/fetchForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/forms");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch forms"
      );
    }
  }
);

export const saveForm = createAsyncThunk(
  "formBuilder/saveForm",
  async (form: Form, { rejectWithValue }) => {
    try {
      const response = form.id
        ? await axios.put(`/forms/${form.id}`, form)
        : await axios.post("/forms", form);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save form"
      );
    }
  }
);

export const deleteForm = createAsyncThunk(
  "formBuilder/deleteForm",
  async (formId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/forms/${formId}`);
      return formId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete form"
      );
    }
  }
);

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    updateFormTitle: (state, action: PayloadAction<string>) => {
      state.currentForm.title = action.payload;
      state.isDirty = true;
    },
    updateFormDescription: (state, action: PayloadAction<string>) => {
      state.currentForm.description = action.payload;
      state.isDirty = true;
    },
    addSection: (state, action: PayloadAction<Section>) => {
      state.currentForm.form_structure.push(action.payload);
      state.isDirty = true;
    },
    updateSection: (
      state,
      action: PayloadAction<{ sectionId: string; section: Section }>
    ) => {
      const index = state.currentForm.form_structure.findIndex(
        (s) => s.id === action.payload.sectionId
      );
      if (index !== -1) {
        state.currentForm.form_structure[index] = action.payload.section;
        state.isDirty = true;
      }
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.currentForm.form_structure =
        state.currentForm.form_structure.filter((s) => s.id !== action.payload);
      state.isDirty = true;
    },
    addGroup: (
      state,
      action: PayloadAction<{ sectionId: string; group: Group }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        section.groups.push(action.payload.group);
        state.isDirty = true;
      }
    },
    updateGroup: (
      state,
      action: PayloadAction<{
        sectionId: string;
        groupId: string;
        group: Group;
      }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        const index = section.groups.findIndex(
          (g) => g.id === action.payload.groupId
        );
        if (index !== -1) {
          section.groups[index] = action.payload.group;
          state.isDirty = true;
        }
      }
    },
    deleteGroup: (
      state,
      action: PayloadAction<{ sectionId: string; groupId: string }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        section.groups = section.groups.filter(
          (g) => g.id !== action.payload.groupId
        );
        state.isDirty = true;
      }
    },
    addField: (
      state,
      action: PayloadAction<{
        sectionId: string;
        groupId: string;
        field: Field;
      }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        const group = section.groups.find(
          (g) => g.id === action.payload.groupId
        );
        if (group) {
          group.fields.push(action.payload.field);
          state.isDirty = true;
        }
      }
    },
    updateField: (
      state,
      action: PayloadAction<{
        sectionId: string;
        groupId: string;
        fieldId: string;
        field: Field;
      }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        const group = section.groups.find(
          (g) => g.id === action.payload.groupId
        );
        if (group) {
          const index = group.fields.findIndex(
            (f) => f.id === action.payload.fieldId
          );
          if (index !== -1) {
            group.fields[index] = action.payload.field;
            state.isDirty = true;
          }
        }
      }
    },
    deleteField: (
      state,
      action: PayloadAction<{
        sectionId: string;
        groupId: string;
        fieldId: string;
      }>
    ) => {
      const section = state.currentForm.form_structure.find(
        (s) => s.id === action.payload.sectionId
      );
      if (section) {
        const group = section.groups.find(
          (g) => g.id === action.payload.groupId
        );
        if (group) {
          group.fields = group.fields.filter(
            (f) => f.id !== action.payload.fieldId
          );
          state.isDirty = true;
        }
      }
    },
    loadForm: (state, action: PayloadAction<Form>) => {
      state.currentForm = action.payload;
      state.isDirty = false;
    },
    newForm: (state) => {
      state.currentForm = {
        title: "Untitled Form",
        description: "",
        form_structure: [],
      };
      state.isDirty = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Forms
      .addCase(fetchForms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedForms = action.payload;
        state.error = null;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Save Form
      .addCase(saveForm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentForm = action.payload;
        state.isDirty = false;
        // Update in saved forms list
        const index = state.savedForms.findIndex(
          (f) => f.id === action.payload.id
        );
        if (index !== -1) {
          state.savedForms[index] = action.payload;
        } else {
          state.savedForms.push(action.payload);
        }
        state.error = null;
      })
      .addCase(saveForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Form
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.savedForms = state.savedForms.filter(
          (f) => f.id !== action.payload
        );
        if (state.currentForm.id === action.payload) {
          state.currentForm = {
            title: "Untitled Form",
            description: "",
            form_structure: [],
          };
          state.isDirty = false;
        }
      });
  },
});

export const {
  updateFormTitle,
  updateFormDescription,
  addSection,
  updateSection,
  deleteSection,
  addGroup,
  updateGroup,
  deleteGroup,
  addField,
  updateField,
  deleteField,
  loadForm,
  newForm,
  clearError,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
