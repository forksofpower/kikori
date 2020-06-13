import React from 'react'
import { createProject } from "../../store/projects.slice";
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

const CreateProjectForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();    
    const onSubmit = data => dispatch(createProject(data))

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Project Name</label>
                    <input type="text" name="name" ref={register}/>
                </Form.Field>
                <Form.Button type="submit">Submit</Form.Button>
            </Form>
        </div>
    )
}

export default CreateProjectForm
