/** @jsx jsx */
import { jsx } from '@emotion/core';

const Form = props => (
  <form
    css={{
      width: props.width || '100%',
      margin: props.center ? '0 auto' : '0',
    }}
    {...props}
  >
    {props.children}
  </form>
);

const FormGroup = props => (
  <div
    css={{
      marginBottom: '1rem',
    }}
  >
    {props.children}
  </div>
);

// const Form = styled.form`
//   width: ${props => props.width || '100%'};
//   margin: ${props => (props.center ? '0 auto' : '0')};

//   input {
//     font-size: small;
//     padding: 12px 16px;
//     text-shadow: ${props => (props.shadow ? '0 1px 1px #fff' : 'none')};
//   }

//   .control-label {
//     display: block;
//     font-weight: ${props => props.weight || 'bold'};
//     margin-bottom: 6px;
//   }

//   .form-group {
//     margin-bottom: ${props => props.mb || '1.4rem'};
//   }

//   .form-control {
//     width: 100%;
//   }

//   .btn {
//     display: inline-block;
//     font-size: small;
//     border-radius: ${props => props.radius || '0px'};
//     padding: 15px 24px;
//     transition: all 0.1s;
//     text-decoration: none;
//     cursor: ${props => props.cursor || 'pointer'};

//     &:hover {
//       color: white;
//       background-color: #dd4b39;
//     }
//   }
// `;

export { Form, FormGroup };
